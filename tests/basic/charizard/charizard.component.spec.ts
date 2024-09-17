import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '../../../src/app/basic/services/pokemon.service';

import { CharizardComponent } from '../../../src/app/basic/charizard/charizard.component';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';

describe('CharizardComponent', () => {
  let component: CharizardComponent;
  let fixture: ComponentFixture<CharizardComponent>;
  let compilied: HTMLElement;
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharizardComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [PokemonService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharizardComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject( HttpTestingController)
    fixture.detectChanges();
    compilied = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('debe de hacer match con el snapshot', () => {
    //console.log(compilied.innerHTML);
    expect(compilied.innerHTML).toMatchSnapshot();
  });

  test('debe de mostrar un loading al incio', () => {
    const h2 = compilied.querySelector('h2');
    expect(h2?.textContent).toContain('Loading...')
  });

  test('debe de cargar a charizard inmediatamente', () => {
    const dummyPokemon = {
      name: 'charizardo!',
      sprites: {
        front_default: 'https://charizard.com/sprite.png'
      }
    };
    const request = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/6');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPokemon);
    fixture.detectChanges();
    const h3 = compilied.querySelector('h3');
    const img = compilied.querySelector('img');
    expect(h3?.textContent?.toLowerCase()).toContain(dummyPokemon.name.toLowerCase())

  });

});
