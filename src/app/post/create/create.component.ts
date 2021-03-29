import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup

  constructor(
    public postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required)
    });
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    var Datos = this.postService.create(this.form.value)
    localStorage.setItem('datos', JSON.stringify(Datos));
    this.router.navigateByUrl('post/index');

    //this.postService.create(this.form.value).subscribe(res => {
    //    console.log('Post created successfully!');
    //    this.router.navigateByUrl('post/index');
    //})
  }
}
