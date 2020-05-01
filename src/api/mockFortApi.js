import delay from './delay';



const forts = [
    {
        "_id": "5ae19e2db90b4b82005c15c7",
        "state": "Telangana",
        "name": "Golkonda",
        "city": "Hyderabad",
        "country": "India",
        "year": 1500,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            }
        ]
    },
    {
        "_id": "5ae19e62b90b4b82005c15c8",
        "state": "Himachal Pradesh",
        "name": "Kamlah Fort",
        "city": "Kamlah",
        "country": "India",
        "year": 1625,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {}
        ]
    },
    {
        "_id": "5ae19e6db90b4b82005c15c9",
        "state": "Madhya Pradesh",
        "name": "Kam",
        "city": "Ujjain",
        "country": "India",
        "year": 1300,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {}
        ]
    },
    {
        "_id": "5ae19e79b90b4b82005c15ca",
        "state": "Karnataka",
        "name": "Great",
        "city": "Banglore",
        "country": "India",
        "year": 1100,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            }
        ]
    },
    {
        "_id": "5ae19e83b90b4b82005c15cb",
        "state": "Karnataka",
        "name": "Great",
        "city": "Banglore",
        "country": "India",
        "year": 1100,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            },
            {}
        ]
    },
    {
        "_id": "5ae19e8eb90b4b82005c15cc",
        "state": "Karnataka",
        "name": "Gokarna",
        "city": "Mangalore",
        "country": "India",
        "year": 1200,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "images": [
            {}
        ]
    },
    {
        "_id": "5ae19e99b90b4b82005c15cd",
        "state": "Karnataka",
        "name": "Gokarna",
        "city": "Mangalore",
        "country": "India",
        "year": 1200,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            }
        ]
    },
    {
        "_id": "5ae19ea3b90b4b82005c15ce",
        "state": "Karnataka",
        "name": "Gok",
        "city": "Mangalore",
        "country": "India",
        "year": 1800,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop."
    },
    {
        "_id": "5ae19eadb90b4b82005c15cf",
        "state": "Karnataka",
        "name": "Great",
        "city": "Banglore",
        "country": "India",
        "year": 1100,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            }
        ]
    },
    {
        "_id": "5ae19eb8b90b4b82005c15d0",
        "state": "Karnataka",
        "name": "Great",
        "city": "Banglore",
        "country": "India",
        "year": 1100,
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9icFSoQpbf_6bBXfVzLc7OvcF0OUS-edU0pBpGYHE-L1eyFNa",
        "history": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "description": "Golconda fort was previously called Mankal and was built by Rajah of Warangal in 1143. The fort was built of mud on a hilltop.",
        "images": [
            {
                "url": "https://en.wikipedia.org/wiki/Golkonda#/media/File:A_View_of_Golconda_Fort.jpg"
            },
            {}
        ]
    }
]
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (fort) => {
  return replaceAll(fort.name, ' ', '-');
};

class FortApi {
    static getAllForts() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], forts));
            }, delay);
        });
    }

    static saveFort(fort) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minFortNameTitleLength = 1;
        if (fort.name.length < minFortNameTitleLength) {
          reject(`Title must be at least ${minFortNameTitleLength} characters.`);
        }

        if (fort._id) {
          const existingFortIndex = forts.findIndex(a => a._id == fort._id);
          forts.splice(existingFortIndex, 1, fort);
        } else {
          fort._id = generateId(fort);
          forts.push(fort);
        }

        resolve(Object.assign({}, fort));
      }, delay);
    });
  }
}

export default FortApi;
