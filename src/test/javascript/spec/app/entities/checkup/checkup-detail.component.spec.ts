import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DjibGateTestModule } from '../../../test.module';
import { CheckupDetailComponent } from 'app/entities/checkup/checkup-detail.component';
import { Checkup } from 'app/shared/model/checkup.model';

describe('Component Tests', () => {
  describe('Checkup Management Detail Component', () => {
    let comp: CheckupDetailComponent;
    let fixture: ComponentFixture<CheckupDetailComponent>;
    const route = ({ data: of({ checkup: new Checkup(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DjibGateTestModule],
        declarations: [CheckupDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CheckupDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CheckupDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load checkup on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.checkup).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
