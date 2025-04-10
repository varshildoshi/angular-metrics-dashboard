import { Injectable } from '@angular/core';
import { colorSets } from '../models/colorSchemes';

@Injectable({
    providedIn: 'root',
})

export class CommonFunction {

    constructor() { }

    getColorSchemeByColorName(value) {
        let colorScheme;
        return colorScheme = colorSets.find(e => e.value == 'cool')?.domain || [];
    }
}