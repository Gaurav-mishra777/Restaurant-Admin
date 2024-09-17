import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {

  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required])
    });

    this.id = this.route.snapshot.params['postId'];

    this.postService.find(this.id).subscribe((data: Post) => {
      this.post = data;

      this.form.patchValue({
        name: this.post.name,
        username: this.post.username,
        city: this.post.address.city
      });
    });
  }

  get f() {
    return this.form.controls;
  }


  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.postService.update(this.id, this.form.value).subscribe((res: any) => {
        console.log('Post updated successfully!');
        this.router.navigateByUrl('post/index');
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
