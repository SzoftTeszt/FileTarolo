import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent {
  files:any
  selectedFile:any={}
  constructor(private uploadservice:UploadService){}

  upload(){
    console.log("Files: ",this.selectedFile.file)
    this.uploadservice.pushFile(this.selectedFile).subscribe(
      (percent)=>console.log(percent,"%")
    )
  }
  
  changes(event:any){
    console.log(event.target.files)
    this.selectedFile.file=event.target.files[0]
  }

}
