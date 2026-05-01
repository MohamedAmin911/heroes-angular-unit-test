import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Status } from './status';

describe('Status component', () => {
  let fixture: ComponentFixture<Status>;
  let component: Status;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Status],
    });

    fixture = TestBed.createComponent(Status);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render initial status as "♥ 0" and button not liked', () => {
    const button = fixture.debugElement.query(By.css('#statusBtn')).nativeElement as HTMLButtonElement;

    expect(component.status()).toBe(0);
    expect(component.isLiked()).toBe(false);
    expect(button.textContent).toContain('0');
    expect(button.classList.contains('liked')).toBe(false);
  });

  it('should increment status to 1 and mark button as liked when clicked once', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#statusBtn'));

    buttonDebugElement.triggerEventHandler('click');
    fixture.detectChanges();

    const button = buttonDebugElement.nativeElement as HTMLButtonElement;
    expect(component.status()).toBe(1);
    expect(component.isLiked()).toBe(true);
    expect(button.textContent).toContain('1');
    expect(button.classList.contains('liked')).toBe(true);
  });

  it('should decrement status back to 0 and remove liked class when clicked twice', () => {
    const buttonDebugElement = fixture.debugElement.query(By.css('#statusBtn'));

    buttonDebugElement.triggerEventHandler('click');
    buttonDebugElement.triggerEventHandler('click');
    fixture.detectChanges();

    const button = buttonDebugElement.nativeElement as HTMLButtonElement;
    expect(component.status()).toBe(0);
    expect(component.isLiked()).toBe(false);
    expect(button.textContent).toContain('0');
    expect(button.classList.contains('liked')).toBe(false);
  });
});
