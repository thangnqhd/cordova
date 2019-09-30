import { Component, OnInit } from '@angular/core';
import { FaceVerifyService } from './face-verify.service';
import { DetectModel } from './face-model';
import { VerifyModel } from './verify-model';

@Component({
  selector: 'app-face-verify',
  templateUrl: './face-verify.component.html',
  styleUrls: ['./face-verify.component.css']
})
export class FaceVerifyComponent implements OnInit {
  base64ImageLeft = '';
  base64ImageRight = '';
  leftDetectModel: DetectModel = null;
  rightDetectModel: DetectModel = null;
  confidence = 0.0;
  resultLabel = '';
  constructor(private faceService: FaceVerifyService) { }

  ngOnInit() {
  }

  /**
   * Handler for left file
   * @param files file list
   */
  handleLeftFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.base64ImageLeft = event.target.result;
        this.detect(ImageSide.Left, this.base64ImageLeft);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Handler for right file
   * @param files file list
   */
  handleRightFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event: any) => {
        this.base64ImageRight = event.target.result;
        this.detect(ImageSide.Right, this.base64ImageRight);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  detect(side: ImageSide, imageData: string) {
    // Reset confidence
    this.confidence = 0;
    this.resultLabel = '';
    this.faceService.detect(imageData).subscribe(
      res => {
        if (res) {
          const detectModel = res as DetectModel[];
          if (side === ImageSide.Left) {
            this.leftDetectModel = detectModel[0];
          } else {
            this.rightDetectModel = detectModel[0];
          }
          this.verify();
        }
      }
    );
  }

  verify() {
    if (!this.leftDetectModel || !this.rightDetectModel) {
      return;
    }

    // Verify Image
    const verifyParam = {
      faceId1: this.leftDetectModel.faceId,
      faceId2: this.rightDetectModel.faceId
    };

    this.faceService.verify(verifyParam).subscribe(
      res => {
        if (res) {
          const verifyRes = res as VerifyModel;
          this.confidence = verifyRes.confidence;
          if (this.confidence < 0.5) {
            this.resultLabel = 'Verification result: The two faces belong to different people.';
          } else {
            this.resultLabel = 'Verification result: The two faces belong to the same person.';
          }
          console.log(verifyRes.confidence);
        }
      }
    );
  }
}

export enum ImageSide {
  Left,
  Right
}
