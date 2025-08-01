import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofuseComponent } from './termsofuse.component';

describe('TermsofuseComponent', () => {
  let component: TermsofuseComponent;
  let fixture: ComponentFixture<TermsofuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsofuseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermsofuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
