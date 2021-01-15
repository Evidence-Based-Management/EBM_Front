import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationCardComponent } from './iteration-card.component';
import { By } from '@angular/platform-browser';

describe('IterationCardComponent', () => {
  let component: IterationCardComponent;
  let fixture: ComponentFixture<IterationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IterationCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationCardComponent);
    component = fixture.componentInstance;
    component.iteration = {
      id: null,
      idProduct: null,
      name: null,
      goal: null,
      startDate: null,
      endDate: null,
      state: null,
      KVM: null,
    };
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit the selected value', () => {
    fixture.detectChanges();
    spyOn(component.selectionChange, 'emit');

    component.onChange('Completed');
    expect(component.selectionChange.emit).toHaveBeenCalled();
  });

  it('should show all goal when its in detail', () => {
    component.iteration.goal =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
    fixture.detectChanges();

    const result = fixture.debugElement.queryAll(By.css('.blockquote'));

    expect(result.length).toBe(1);

    expect(result[0].nativeElement.innerHTML).toBe(
      '<p class="mb-0">Goal:</p><footer class="blockquote-footer"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </footer>'
    );
  });

  it('should show just the first 47 characters of the goal when it is not in detail', () => {
    component.iteration.goal =
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
    component.isDetail = false;
    fixture.detectChanges();

    const result = fixture.debugElement.queryAll(By.css('.blockquote'));
    expect(result.length).toBe(1);

    expect(result[0].nativeElement.innerHTML).toBe(
      '<p class="mb-0">Goal:</p><footer class="blockquote-footer"> Lorem Ipsum is simply dummy text of the printin </footer>'
    );
  });

  it('should show the start date and end date empty when its in detail', () => {
    component.isDetail = true;
    fixture.detectChanges();
    const result = fixture.debugElement.queryAll(By.css('.blockquote'));

    expect(result.length).toBe(3);
    expect(result[1].nativeElement.innerHTML).toBe(
      '<p class="mb-0">Start Date:</p><footer class="blockquote-footer"></footer>'
    );
    expect(result[2].nativeElement.innerHTML).toBe(
      '<p class="mb-0">End Date:</p><footer class="blockquote-footer"></footer>'
    );
  });

  it('should show the start date and end date with data when its in detail', () => {
    component.isDetail = true;
    component.iteration.startDate = '12/30/2020 3:46 PM';
    component.iteration.endDate = '1/30/2021 3:46 PM';
    fixture.detectChanges();

    const result = fixture.debugElement.queryAll(By.css('.blockquote'));

    expect(result.length).toBe(3);
    expect(result[1].nativeElement.innerHTML).toBe(
      '<p class="mb-0">Start Date:</p><footer class="blockquote-footer">12/30/2020 3:46 PM</footer>'
    );
    expect(result[2].nativeElement.innerHTML).toBe(
      '<p class="mb-0">End Date:</p><footer class="blockquote-footer">1/30/2021 3:46 PM</footer>'
    );
  });
});
