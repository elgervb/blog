import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditableComponent } from './form/editable/editable.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [EditableComponent]
})
export class SharedModule { }
