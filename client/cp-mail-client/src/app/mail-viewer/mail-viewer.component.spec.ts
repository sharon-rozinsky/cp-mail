import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailViewerComponent } from './mail-viewer.component';

describe('MailViewerComponent', () => {
  let component: MailViewerComponent;
  let fixture: ComponentFixture<MailViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
