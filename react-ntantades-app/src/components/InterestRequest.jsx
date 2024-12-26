import { collection /*,getDocs*/ } from "firebase/firestore";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const getUsers = async () => {
//   const usersSnapshot = await getDocs(collection(db, "users"));
//   return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
// };

// Method to add an Interest request in
const sendRequest = async (fromUserId, toUserId) => {
  await addDoc(collection(db, "requests"), {
    fromUserId,
    toUserId,
    status: "pending",
    timestamp: serverTimestamp(),
  });
  alert("Request sent!");
};

