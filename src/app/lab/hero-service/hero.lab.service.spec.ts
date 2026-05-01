import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IHero } from '../../models/ihero';
import { HeroServiceForLab } from './hero.lab.service';

describe('hero service (for lab) http testing:', () => {
  let httpTesting: HttpTestingController;
  let service: HeroServiceForLab;

  const heroesUrl = 'http://localhost:3000/heroes';
  const fakeHero: IHero = {
    id: 7,
    name: 'flash',
    strength: 90,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroServiceForLab);
  });

  it('should make a GET request to fetch hero by id and emit the returned hero', () => {
    service.getHero(fakeHero.id).subscribe((hero) => {
      expect(hero).toEqual(fakeHero);
    });

    const testRequest = httpTesting.expectOne(`${heroesUrl}/${fakeHero.id}`);
    expect(testRequest.request.method).toBe('GET');

    testRequest.flush(fakeHero);
  });

  it('should make a PUT request to update a hero and emit the updated hero', () => {
    service.updateHero(fakeHero).subscribe((hero) => {
      expect(hero).toEqual(fakeHero);
    });

    const testRequest = httpTesting.expectOne(`${heroesUrl}/${fakeHero.id}`);
    expect(testRequest.request.method).toBe('PUT');
    expect(testRequest.request.body).toEqual(fakeHero);
    expect(testRequest.request.headers.get('Content-Type')).toBe('application/json');

    testRequest.flush(fakeHero);
  });

  afterEach(() => {
    httpTesting.verify();
  });
});
