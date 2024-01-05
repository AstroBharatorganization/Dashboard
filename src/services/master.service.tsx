// Libraries
import { nanoid } from "nanoid";
import { masterSchemaType } from "../models/master.model";
import {
  collection,
  addDoc,
  getDocs,
  // query,
  // startAt,
  // limit,
  // orderBy,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Config
import { firestore, storage } from "../config/firebase.config";

export const masterCollection = collection(firestore, "Masters");

export const UploadProfile = async (file: File, masterName: string) => {
  const profileRef = ref(
    storage,
    `masters/profiles/${masterName + "_" + nanoid()}`
  );

  try {
    const snapshot = await uploadBytes(profileRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    // Handle any errors here
    console.error("Error uploading profile:", error);
    throw error;
  }
};

export const CreateMaster = async (data: masterSchemaType) => {
  const newMaster = await addDoc(masterCollection, { ...data });
  console.log("the new master is created", newMaster);
};

export const GetMasters = async (): Promise<object[]> => {
  try {
    const collectionRef = collection(firestore, "Masters");
    const querySnapshot = await getDocs(collectionRef);

    const masters: object[] = [];

    querySnapshot.docs.forEach((doc) => {
      masters.push({ ...doc.data(), id: doc.id });
    });

    return masters;
  } catch (err) {
    console.error(err);
    throw err; // You should re-throw the error so that callers can handle it
  }
};
