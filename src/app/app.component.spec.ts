import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { findIndex, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
  let appServiceMock: jasmine.SpyObj<AppService>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    appServiceMock = jasmine.createSpyObj('AppService', ['getCharacter'])
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AppService,
          useValue: appServiceMock 
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should add character to list upon calling method', () => {
    const testCharacter = {
      name: 'Test Character',
      gender: 'Male',
      culture: 'Test',
      titles: [
        'The boss',
        'The main guy'
      ],
      allegiances: []
    };
    appServiceMock.getCharacter.and.returnValue(of({...testCharacter}));
    fixture.detectChanges();
    component.characterForm.setValue({ characterId: 42 });
    component.submitCharacterForm();
    expect(appServiceMock.getCharacter).toHaveBeenCalledOnceWith(42);
    expect(component.characters.length).toBe(1);
    expect(component.characters[0]).toEqual(testCharacter);
    expect(component.characters[0]).not.toBe(testCharacter);
  });

  it('should add a character to the list via UI', () => {
    const testCharacter = {
      name: 'Test Character',
      gender: 'Male',
      culture: 'Test',
      titles: [
        'The boss',
        'The main guy'
      ],
      allegiances: []
    };
    appServiceMock.getCharacter.and.returnValue(of({...testCharacter}));
    const element: HTMLElement = fixture.nativeElement;
    const inputField = element.querySelector('input');
    const submitButton = element.querySelector('button');
    const submitCharacterFormSpy = spyOn(component, 'submitCharacterForm');
    submitCharacterFormSpy.and.callThrough();
    if (!inputField || !submitButton) {
      fail('input field could not be found');
      return;
    }
    inputField.value = '42';
    inputField.dispatchEvent(new Event('input'));
    expect(component.characterForm.valid).toBeTrue();
    expect(component.characterForm.get('characterId')?.value).toEqual('42')
    submitButton.click();
    fixture.whenStable().then(() => {
      expect(submitCharacterFormSpy).toHaveBeenCalledTimes(1);
      expect(component.characters.length).toBe(1);
      expect(component.characters[0]).toEqual(testCharacter);
      expect(component.characters[0]).not.toBe(testCharacter);
    })
    
  });
});
