import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id!: number;
  post!: Post;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

   
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
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
  }
}
