import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath="/uploads"

  constructor(private db: AngularFireDatabase, private storage:AngularFireStorage) { }

  pushFile(fileUpLoad:any){
      const filename = Date.now()+fileUpLoad.name
      const filePath= this.basePath+"/"+filename
      const storageRef = this.storage.ref(filePath)
      const uploadTask = this.storage.upload(filePath, fileUpLoad)
      uploadTask.snapshotChanges().pipe(
        finalize(()=>{
          storageRef.getDownloadURL().subscribe(
            (url:any)=>{
              let file ={url:url, filename:filename}
              this.saveFileData(file)
            })
        })).subscribe()
      return uploadTask.percentageChanges()
  }
  saveFileData(file:any){
    this.db.list(this.basePath).push(file)
  }
  
  getFiles(){
    return this.db.list(this.basePath)
  }

  deleteFile(file:any){
    this.deleteFileDatabase(file.key).then(
      ()=>this.deleteFileStorage(file.filename)
    ).catch(
      (err)=>console.log(err)
    )
  }

  private deleteFileStorage(key:any){
    this.storage.ref(this.basePath).child(key).delete()

  }
  private deleteFileDatabase(key:any){
    return this.db.list(this.basePath).remove(key)
  }
}
