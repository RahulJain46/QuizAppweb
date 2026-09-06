import moment from "moment";
import { v5 as uuidv5 } from "uuid";
import { links } from "../../Config";

/**
 * Scoring and submission rules for the daily quiz, matching the existing
 * QuizForm exactly: identity is derived from name + mobile, each correct
 * answer is worth two marks, and a day can only be submitted once.
 */

/** The same person must resolve to the same id across days. */
export function userIdFor(fullname, mobile) {
  return uuidv5(
    `${String(fullname || "").trim().toLowerCase()}${String(mobile || "").trim()}`,
    uuidv5.DNS
  );
}

export function scoreAnswers(questions, answers) {
  let correct = 0;
  const recorded = questions.map((question) => {
    const given = answers[question.question] || "";
    if (given && given.toLowerCase() === String(question.answer || "").toLowerCase()) {
      correct += 1;
    }
    return {
      question: question.question,
      answer: given,
      _id: uuidv5(question.question, uuidv5.DNS),
    };
  });

  return { correct, score: correct * 2, answers: recorded };
}

async function json(response) {
  return response.json();
}

/**
 * Sends one day's answers.
 *
 * Resolves to `{ status: "duplicate" }` when this person already submitted for
 * the date, so the caller can say so instead of double-counting a score.
 */
export async function submitQuizResponse({
  date,
  profile,
  questions,
  answers,
  feedback,
  suggestion,
}) {
  const userId = userIdFor(profile.fullname, profile.mobile);
  const { correct, score, answers: recorded } = scoreAnswers(questions, answers);

  const responseBody = {
    time: moment().format("DD:MM:YYYY HH:mm:ss"),
    comment: "",
    userId,
    feedback,
    suggestion: String(suggestion || "").trim(),
    score,
    answers: recorded,
  };

  const existingUsers = await fetch(
    `${links.backendURL}users?&userId=${userId}`
  ).then(json);

  if (existingUsers > 0) {
    const alreadyAnswered = await fetch(
      `${links.backendURL}usersresponse?date=${date}&userId=${userId}`
    ).then(json);
    if (alreadyAnswered) {
      return { status: "duplicate", userId, score, correct };
    }
  } else {
    await fetch(`${links.backendURL}users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: String(profile.fullname || "").trim(),
        city: String(profile.city || "").trim(),
        mobile: String(profile.mobile || "").trim(),
        address: String(profile.address || "").trim(),
        userId,
      }),
    });
  }

  const saved = await fetch(
    `${links.backendURL}usersresponse?date=${date}&update=true`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responseBody),
    }
  );

  if (!saved.ok) throw new Error(`Submission failed (${saved.status})`);

  return { status: "submitted", userId, score, correct };
}
