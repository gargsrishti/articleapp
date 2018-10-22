import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsdisplayComponent } from './feedsdisplay.component';

describe('FeedsdisplayComponent', () => {
  let component: FeedsdisplayComponent;
  let fixture: ComponentFixture<FeedsdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
