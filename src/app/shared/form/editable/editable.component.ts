import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Implement the content editable property
 */
@Component({
  selector: 'app-editable',
  template: '{{value}}',
  styleUrls: ['./editable.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref this is the de facto way to register formcontrols in Angular
    useExisting: forwardRef(() => EditableComponent),
    multi: true
  }]
})
export class EditableComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = true;

  value: string;

  private onChange = (_: string) => { };
  private onTouched = () => { };

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  registerOnChange(fn: (_: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (this.disabled === false) {
      this.onTouched();
    }
  }

}
