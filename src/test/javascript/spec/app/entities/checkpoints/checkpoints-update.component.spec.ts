import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DjibGateTestModule } from '../../../test.module';
import { CheckpointsUpdateComponent } from 'app/entities/checkpoints/checkpoints-update.component';
import { CheckpointsService } from 'app/entities/checkpoints/checkpoints.service';
import { Checkpoints } from 'app/shared/model/checkpoints.model';

describe('Component Tests', () => {
  describe('Checkpoints Management Update Component', () => {
    let comp: CheckpointsUpdateComponent;
    let fixture: ComponentFixture<CheckpointsUpdateComponent>;
    let service: CheckpointsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DjibGateTestModule],
        declarations: [CheckpointsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CheckpointsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CheckpointsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CheckpointsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Checkpoints(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Checkpoints();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
