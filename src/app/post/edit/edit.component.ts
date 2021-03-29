import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id!: number;
  post!: Post;
  form!: FormGroup

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    //this.postService.find(this.id).subscribe((data: Post)=>{
      //this.post = data;
    //});
    var Post = this.postService.find(this.id)
    var data = []
    for (var i = 0; i < Post.length; i++){
      var obj = Post[i];
      if (obj.id==this.id){
        data.push({
          id: obj.id,
          name: obj.name,
          phone: obj.phone,
          address: obj.address
        });
        this.post = {
          id: obj.id,
          name: obj.name,
          phone: obj.phone,
          address: obj.address
        };
      }
    }     
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required)
    });    
  }
  get f(){
    return this.form.controls;
  }
     submit(){
    var Datos = this.postService.update(this.id, this.form.value)
    localStorage.setItem('datos', JSON.stringify(Datos));
    this.router.navigateByUrl('post/index');
    //this.postService.update(this.id, this.form.value).subscribe(res => {
      //   console.log('Post updated successfully!');
       //  this.router.navigateByUrl('post/index');
    //})
  }

}
