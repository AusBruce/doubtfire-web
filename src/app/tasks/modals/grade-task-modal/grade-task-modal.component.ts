import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Task} from 'src/app/api/models/task';
import {GradeService} from 'src/app/common/services/grade.service'; // Adjust the import path as necessary

export interface GradeTaskModalData {
  task: Task;
}

@Component({
  selector: 'f-grade-task-modal',
  templateUrl: './grade-task-modal.component.html',
  styleUrls: ['./grade-task-modal.component.scss']
})
export class GradeTaskModalComponent implements OnInit {
  task: Task;
  data: { desiredGrade: number; rating: number; overStar: number; confRating: number };
  gradeValues: number[];
  grades: { [key: number]: string };
  numStars: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: GradeTaskModalData,
    private dialogRef: MatDialogRef<GradeTaskModalComponent>,
    private gradeService: GradeService,
  ) {}

  ngOnInit(): void {
    this.task = this.dialogData.task;
    this.data = {
      desiredGrade: this.task.grade,
      rating: this.task.qualityPts || 1,
      overStar: 0,
      confRating: 0
    };
    this.gradeValues = this.gradeService.allGradeValues;
    this.grades = this.gradeService.grades;
    this.numStars = this.task.definition.maxQualityPts || 5;
  }

  close(): void {
    this.dialogRef.close({ qualityPts: this.data.rating, selectedGrade: this.data.desiredGrade });
  }

  dismiss(): void {
    this.dialogRef.close();
  }

  hoveringOver(value: number): void {
    this.data.overStar = value;
  }

  checkClearRating(): void {
    if (this.data.confRating === 1 && this.data.rating === 1 && this.data.overStar === 1) {
      this.data.rating = 0;
    } else if (this.data.confRating === 1 && this.data.overStar === 1 && this.data.rating === 0) {
      this.data.rating = 1;
    }
    this.data.confRating = this.data.rating;
  }
}
