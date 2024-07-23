import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayComponent } from './play.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { of } from 'rxjs';
import { CategoryWord } from '../../models/gamemodel';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let router: Router;
  let dataService: DataService;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlayComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: DataService,
          useValue: {
            getRandomWord: jasmine
              .createSpy('getRandomWord')
              .and.returnValue(of({ name: 'TEST' } as CategoryWord)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    dataService = TestBed.inject(DataService);
    navigateSpy = router.navigate as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the menu button image', () => {
    fixture.detectChanges();
    const menuButtonImage = fixture.debugElement.query(By.css('button img'));
    expect(menuButtonImage).toBeTruthy();
    expect(menuButtonImage.nativeElement.src).toContain(
      '/assets/images/icon-menu.svg'
    );
  });

  it('should render the "Continue" button text when menu is open', () => {
    component.isMenuOpen = true;
    fixture.detectChanges();
    const continueButtonText = fixture.debugElement.query(
      By.css('a div') // Adjust this selector if needed
    );
    expect(continueButtonText).toBeTruthy();
    expect(continueButtonText.nativeElement.textContent).toContain('Continue');
  });

  it('should call playAgain() method on Play Again button click', () => {
    spyOn(component, 'playAgain');
    fixture.detectChanges();
    const playAgainButton = fixture.debugElement.query(
      By.css('a[click="playAgain()"]') // Adjust this selector if needed
    );
    expect(playAgainButton).toBeTruthy();
    playAgainButton.triggerEventHandler('click', null);
    expect(component.playAgain).toHaveBeenCalled();
  });

  it('should call restart() method on NEW CATEGORY button click', () => {
    spyOn(component, 'restart');
    fixture.detectChanges();
    const newCategoryButton = fixture.debugElement.query(
      By.css('a[click="restart()"]') // Adjust this selector if needed
    );
    expect(newCategoryButton).toBeTruthy();
    newCategoryButton.triggerEventHandler('click', null);
    expect(component.restart).toHaveBeenCalled();
  });

  it('should call gotoHome() method on Quit Game button click', () => {
    spyOn(component, 'gotoHome');
    fixture.detectChanges();
    const quitGameButton = fixture.debugElement.query(
      By.css('a[click="gotoHome()"]') // Adjust this selector if needed
    );
    expect(quitGameButton).toBeTruthy();
    quitGameButton.triggerEventHandler('click', null);
    expect(component.gotoHome).toHaveBeenCalled();
  });
});
