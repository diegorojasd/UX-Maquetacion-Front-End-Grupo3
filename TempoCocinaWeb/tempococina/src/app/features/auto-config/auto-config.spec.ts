import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import AutoConfig from './auto-config';

describe('AutoConfig', () => {
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoConfig],
      providers: [provideRouter([])],
    }).compileComponents();

    const fixture = TestBed.createComponent(AutoConfig);
    fixture.detectChanges();
    el = fixture.nativeElement as HTMLElement;
  });

  it('uses a real table with a caption, column headers and row headers', () => {
    expect(el.querySelector('caption')?.textContent?.trim()).toBeTruthy();

    const columns = Array.from(el.querySelectorAll('thead th'));
    expect(columns).toHaveLength(5);
    expect(columns.every((th) => th.getAttribute('scope') === 'col')).toBe(true);

    const rowHeaders = Array.from(el.querySelectorAll('tbody th'));
    expect(rowHeaders).toHaveLength(4);
    expect(rowHeaders.every((th) => th.getAttribute('scope') === 'row')).toBe(true);
    expect(rowHeaders.map((th) => th.textContent?.trim())).toEqual(['01', '02', '03', '04']);
  });

  it('names every control by its row and column, since column headers do not', () => {
    // Four controls per row: name, minutes, sound and remove.
    const named = Array.from(el.querySelectorAll('tbody input, tbody select, tbody button'));
    expect(named.length).toBe(16);
    expect(named.every((c) => (c.getAttribute('aria-label') ?? '').length > 0)).toBe(true);

    const first = el.querySelector('tbody tr');
    expect(first?.querySelector('input:not([inputmode])')?.getAttribute('aria-label')).toBe(
      'Proceso detectado 01',
    );
    expect(first?.querySelector('select')?.getAttribute('aria-label')).toBe(
      'Sonido de alarma del proceso 01',
    );
  });

  it('folds the unit into the minutes field name, since it sits outside the control', () => {
    const minutes = el.querySelector('input[inputmode="numeric"]');
    expect(minutes?.getAttribute('aria-label')).toBe(
      'Tiempo asignado del proceso 01, en minutos',
    );
  });

  it('says what the icon-only remove button removes', () => {
    const removes = Array.from(el.querySelectorAll('tbody button'));
    expect(removes.map((b) => b.getAttribute('aria-label'))).toEqual([
      'Eliminar proceso 01',
      'Eliminar proceso 02',
      'Eliminar proceso 03',
      'Eliminar proceso 04',
    ]);
  });

  it('seeds the form array from the mock without submitting anything', () => {
    const names = Array.from(el.querySelectorAll<HTMLInputElement>('input:not([inputmode])'));
    expect(names.map((i) => i.value)).toEqual([
      'Pollo al horno — Sellado y dorado',
      'Arroz — Absorción y cocción a fuego lento',
      'Precalentar horno a 200°C',
      'Reposo final de asado y redistribución',
    ]);

    const minutes = Array.from(el.querySelectorAll<HTMLInputElement>('input[inputmode="numeric"]'));
    expect(minutes.map((i) => i.value)).toEqual(['35', '15', '10', '5']);

    // A native select, so the keyboard behaviour is the browser's.
    const selects = Array.from(el.querySelectorAll<HTMLSelectElement>('select'));
    expect(selects).toHaveLength(4);
    expect(selects[0].options).toHaveLength(5);
    expect(selects[0].value).toBe('Timbre clásico');
  });
});
