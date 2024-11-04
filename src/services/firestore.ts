import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';

export const saveFavoriteArticle = async (userId: string, article: any) => {
    try {
        console.log('red')
    const userDoc = doc(db, 'favorites', userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      await updateDoc(userDoc, {
        articles: arrayUnion(article),
      });
    } else {
      await setDoc(userDoc, { articles: [article] });
    }
  } catch (error) {
    console.error('Error saving favorite article:', error);
  }
};

export const getFavoriteArticles = async (userId: string) => {
  try {
    const userDoc = doc(db, 'favorites', userId);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return userSnapshot.data().articles || [];
    }
    return [];
  } catch (error) {
    console.error('Error getting favorite articles:', error);
    return [];
  }
};
