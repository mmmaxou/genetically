import {Genetical, GeneticAlgorithm, BitChain} from 'genetical';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

type GeneticEnvironmentStatus = 'Running' | 'Stopped';

@Component({
  selector: 'app-genetic-environment',
  templateUrl: './genetic-environment.component.html',
  styleUrls: ['./genetic-environment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneticEnvironmentComponent implements OnInit {
  @Input() geneticAlgorithm: GeneticAlgorithm<any>;
  @Output() stop = new EventEmitter();
  @Output() start = new EventEmitter();

  public status: GeneticEnvironmentStatus = 'Stopped';

  constructor() {}

  ngOnInit() {}

  get isRunning(): boolean {
    return this.status === 'Running';
  }

  runEnv(): void {
    this.status = 'Running';
    this.start.emit();
  }

  stopEnv(): void {
    this.status = 'Stopped';
    this.stop.emit();
  }
}
