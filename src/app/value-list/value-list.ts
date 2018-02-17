import {Component, Input, ViewChild, ElementRef, forwardRef} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    FormGroup,
    FormControl
} from '@angular/forms';

const SYN_VALUE_LIST_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SynValueListComponent),
    multi: true
};


@Component({
    selector: 'syn-value-list',
    templateUrl: './value-list.html',
    providers: [
        SYN_VALUE_LIST_CONTROL_VALUE_ACCESSOR
    ],
})
export class SynValueListComponent implements ControlValueAccessor {

    @Input() buttonLabel: string = 'Add';

    @Input() placeholder: string = '';

    @ViewChild('addInput') addInput: ElementRef;

    @Input() set validators(validators: ValidatorFn | ValidatorFn[]) {
        this.inputControl.setValidators(validators);
    }

    @Input() invalidMessage: string = 'Invalid input';

    value: string;
    valueSet: Set<string>;
    form: FormGroup;
    private inputControl: FormControl;

    get values(): string[] {
        let values: any[] = [];
        this.valueSet.forEach(v => values.push(v));
        return values;
    }

    get hasInvalidInput(): boolean {
        return this.inputControl.value && this.inputControl.invalid && this.inputControl.touched;
    }

    constructor() {
        this.valueSet = new Set<string>();
        this.inputControl = new FormControl('');
        this.form = new FormGroup({
            valInput: this.inputControl,
        });
    }

    initValues(values: string[]) {
        if (this.valueSet.size) {
            return
        }
        values.forEach(v => this.valueSet.add(v));
    }

    add() {
        if (!this.inputControl.value || this.inputControl.invalid) {
            return
        }
        this.valueSet.add(this.inputControl.value);
        this.inputControl.reset();
        this.addInput.nativeElement.focus();
        this.onTouched();
        this.onChange(this.values);
    }

    remove(value: string) {
        this.valueSet.delete(value);
        this.onTouched();
        this.onChange(this.values);
    }

    // Reset touched status if no input is entered
    onBlur(){
        if(!this.inputControl.value){
            this.inputControl.reset();
        }
    }

    /* emits to outside world (ngModel) */
    onChange = (_: any) => {
    };
    onTouched = () => {
    };

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    /* Sets selected label from [ngModel] (which is the ID of an option) */
    writeValue(values: string[]) {
        this.initValues(values || []);
    }
}
