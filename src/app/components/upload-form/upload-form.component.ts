import { Component } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrl: './upload-form.component.css'
})
export class UploadFormComponent {
  files:any
  selectedFile:any=undefined
  percentage=0
  constructor(private uploadservice:UploadService){}

  upload(){
    console.log("Files: ",this.selectedFile)
    for (const element of this.selectedFile) {
      this.uploadservice.pushFile(element).subscribe(
        (percent)=>this.percentage=Math.round(Number(percent))
      )
    }


  
    this.selectedFile=undefined
  }
  
  changes(event:any){
    console.log(event.target.files)
    this.selectedFile={}
    this.selectedFile=event.target.files
  }

}
