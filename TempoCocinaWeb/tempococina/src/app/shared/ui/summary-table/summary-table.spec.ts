import { TestBed } from '@angular/core/testing';
import { TRANSFER_ROWS } from '../../mocks/recipe.mock';
import { SummaryTable } from './summary-table';

describe('SummaryTable', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [SummaryTable] }).compileComponents();
  });

  function render() {
    const fixture = TestBed.createComponent(SummaryTable);
    fixture.componentRef.setInput('rows', TRANSFER_ROWS);
    fixture.componentRef.setInput('caption', 'Resumen final de alarmas');
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('is a real table with a caption and scoped column headers', () => {
    const el = render();

    expect(el.querySelector('table')).toBeTruthy();
    expect(el.querySelector('caption')?.textContent).toContain('Resumen final de alarmas');

    const headers = Array.from(el.querySelectorAll('thead th'));
    expect(headers).toHaveLength(4);
    expect(headers.every((th) => th.getAttribute('scope') === 'col')).toBe(true);
    expect(headers.map((th) => th.textContent?.trim())).toEqual([
      'Proceso / Identificador',
      'Duración',
      'Canal / Sonido',
      'Estado',
    ]);
  });

  it('puts every process in the body, never in the header row', () => {
    const el = render();

    const bodyRows = el.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(4);
    expect(el.querySelectorAll('tbody th')).toHaveLength(0);
  });

  it('keeps the row order the design specifies, chicken before preheat', () => {
    const el = render();

    const titles = Array.from(el.querySelectorAll('tbody .tc-table__title')).map((p) =>
      p.textContent?.trim(),
    );
    expect(titles).toEqual([
      '1. Pollo al horno — Sellado y dorado',
      '2. Arroz — Absorción y cocción lenta',
      '3. Precalentar horno a 200°C',
      '4. Reposo final de asado y trinchado',
    ]);
  });

  it('states each status in words, not only by color', () => {
    const el = render();

    const statuses = Array.from(el.querySelectorAll('tbody tc-status-badge')).map((b) =>
      b.textContent?.trim(),
    );
    expect(statuses).toEqual(['Listo', 'Listo', 'Listo', 'Listo']);
  });
});
