import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Character } from './character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  characterForm: FormGroup
  characters: Character[];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appService: AppService
  ) {}

  ngOnInit(): void {
    this.characters = [];
    this.characterForm = this.formBuilder.group({
      characterId: [''],
    })
  }

  submitCharacterForm(): void {
    const { characterId } = this.characterForm.value;
    this.appService.getCharacter(characterId).subscribe((character: Character) => {
      this.characterForm.reset();
      this.characters.push(character)
    });
  }
}
