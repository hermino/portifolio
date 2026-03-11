import { TestBed } from '@angular/core/testing';
import { DeferBlockBehavior, DeferBlockState } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all layout sections', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const deferBlocks = await fixture.getDeferBlocks();
    for (const block of deferBlocks) {
      await block.render(DeferBlockState.Complete);
    }

    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('app-about')).toBeTruthy();
    expect(el.querySelector('app-projects')).toBeTruthy();
    expect(el.querySelector('app-experiences')).toBeTruthy();
    expect(el.querySelector('app-skills')).toBeTruthy();
    expect(el.querySelector('app-contacts')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });
});
