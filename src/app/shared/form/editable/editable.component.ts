import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Implement the content editable property
 */
@Component({
  selector: 'blog-editable',
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

  constructor(private element: ElementRef) { }

  ngOnInit() { }

  @HostBinding('attr.contenteditable')
  get isEnabled() {
    return !this.disabled;
  }

  @HostListener('click')
  setEditable() {
    this.setDisabledState(false);
    setTimeout(() => this.element.nativeElement.focus(), 0);
  }

  @HostListener('document:click', ['$event'])
  setReadonly(event?: UIEvent) {
    if (event && !this.element.nativeElement.contains(event.target)) {
      this.setDisabledState(true);
    }
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
