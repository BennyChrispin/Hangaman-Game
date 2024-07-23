import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockRouter {
  navigate = jest.fn();
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [HomeComponent],
      providers: [{ provide: Router, useClass: MockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as unknown as MockRouter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to start on start button click', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const startButton = fixture.debugElement.query(
      By.css('a[ng-reflect-click="start()"]')
    );

    startButton.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith(['/start']);
  });

  it('should navigate to instructions on instructions button click', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const instructionButton = fixture.debugElement.query(
      By.css('a[ng-reflect-click="gotToInstruction()"]') // Adjust based on actual HTML structure
    );

    instructionButton.triggerEventHandler('click', null);

    expect(navigateSpy).toHaveBeenCalledWith(['/instruction']);
  });

  it('should render the logo image', () => {
    const logoImage = fixture.debugElement.query(By.css('legend img'));
    expect(logoImage).toBeTruthy();
    expect(logoImage.nativeElement.src).toContain('/assets/images/logo.svg');
  });

  it('should render the play button image', () => {
    const playButtonImage = fixture.debugElement.query(
      By.css('a img') // Adjust this selector as needed
    );
    expect(playButtonImage).toBeTruthy();
    expect(playButtonImage.nativeElement.src).toContain(
      '/assets/images/icon-play.svg'
    );
  });

  it('should render the "HOW TO PLAY" button text', () => {
    const instructionButtonText = fixture.debugElement.query(
      By.css('a div') // Adjust this selector as needed
    ).nativeElement.textContent;
    expect(instructionButtonText).toContain('HOW TO PLAY');
  });
});
