import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {QuizQuestion} from '../../model/quizQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit, OnChanges {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  @Input() question: QuizQuestion;
  @Output() onChangeQuestionChange: EventEmitter<any> = new EventEmitter();

  questionHasAnswer = false;

  constructor() {
  }


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.checkboxes && this.checkboxes.length) {
      this.questionHasAnswer = false;
      this.checkboxes.forEach((element) => {
        element.nativeElement.checked = false;
      });
    }
  }

  public answerChanged(choice): void {
    if (!choice) {
      return;
    }
    this.questionHasAnswer = true;
    this.onChangeQuestionChange.emit(choice);
  }

}
