import { Component, OnInit, Input } from '@angular/core';
import { AnimationModel, ITextRenderEventArgs, FontModel } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit {
  @Input() color: string
  
  constructor() { }
  public animation: AnimationModel;
  public isIndeterminate: boolean;
  public labelStyle: FontModel;
  public showProgressValue: boolean;
  public textRender(args: ITextRenderEventArgs): void {
    args.text = '50';
  }
    ngOnInit(): void {
        this.animation = { enable: true, duration: 2000, delay: 0 };
      this.isIndeterminate = true;
      this.labelStyle = { color: '#FFFFFF' };
      this.showProgressValue = true;

}
}

