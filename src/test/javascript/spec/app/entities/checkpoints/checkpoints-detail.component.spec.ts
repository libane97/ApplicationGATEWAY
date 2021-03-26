import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DjibGateTestModule } from '../../../test.module';
import { CheckpointsDetailComponent } from 'app/entities/checkpoints/checkpoints-detail.component';
import { Checkpoints } from 'app/shared/model/checkpoints.model';

describe('Component Tests', () => {
  describe('Checkpoints Management Detail Component', () => {
    let comp: CheckpointsDetailComponent;
    let fixture: ComponentFixture<CheckpointsDetailComponent>;
    const route = ({ data: of({ checkpoints: new Checkpoints(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DjibGateTestModule],
        declarations: [CheckpointsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CheckpointsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CheckpointsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load checkpoints on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.checkpoints).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
