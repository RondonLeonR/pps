import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore) { }

  public create(collection:string, data:any){
    return this.firestore.collection(collection).add(data);
  }

  public getById(documentId: string){
    return this.firestore.collection('votaciones').doc(documentId).snapshotChanges();
  }

  public getAll(collection: string){
    return this.firestore.collection(collection).snapshotChanges();
  }

  public ToUpdate(collection: string, documentId: string, data: any){
    return this.firestore.collection(collection).doc(documentId).set(data);
  }
}
