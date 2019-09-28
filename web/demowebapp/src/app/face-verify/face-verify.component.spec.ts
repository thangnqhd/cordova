import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceVerifyComponent } from './face-verify.component';

describe('FaceVerifyComponent', () => {
  let component: FaceVerifyComponent;
  let fixture: ComponentFixture<FaceVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
