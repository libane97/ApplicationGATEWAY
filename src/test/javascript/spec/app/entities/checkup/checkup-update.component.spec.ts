import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { DjibGateTestModule } from '../../../test.module';
import { CheckupUpdateComponent } from 'app/entities/checkup/checkup-update.component';
import { CheckupService } from 'app/entities/checkup/checkup.service';
import { Checkup } from 'app/shared/model/checkup.model';

describe('Component Tests', () => {
  describe('Checkup Management Update Component', () => {
    let comp: CheckupUpdateComponent;
    let fixture: ComponentFixture<CheckupUpdateComponent>;
    let service: CheckupService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [DjibGateTestModule],
        declarations: [CheckupUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CheckupUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CheckupUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CheckupService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Checkup(123);
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
        const entity = new Checkup();
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
