/**
 * Remembers the quiz taker's details on their own device.
 *
 * Most people here take the quiz daily on one phone and retype the same four
 * fields every time. Nothing is sent anywhere by this module; it only mirrors
 * what the user already submits.
 */

const STORAGE_KEY = "jindarshan_profile";

const FIELDS = ["mobile", "fullname", "city", "address"];

/** Private browsing and disabled storage both throw, so every access is guarded. */
function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
}

export function loadProfile() {
  const raw = readStorage();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const profile = {};
    FIELDS.forEach((field) => {
      profile[field] = typeof parsed[field] === "string" ? parsed[field] : "";
    });
    return profile.mobile || profile.fullname ? profile : null;
  } catch (error) {
    return null;
  }
}

export function saveProfile(profile) {
  const next = {};
  FIELDS.forEach((field) => {
    next[field] = String((profile && profile[field]) || "").trim();
  });
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    // Saving is a convenience; failing to store must never block a submission.
  }
  return next;
}

export function clearProfile() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Nothing to do.
  }
}
