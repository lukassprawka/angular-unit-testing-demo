import { LikeComponent } from './like.component';
import { log } from 'util';

describe('like component', () => {
  let likeComponent: LikeComponent;

  beforeEach(() => {
    likeComponent = new LikeComponent();
  })

  it('should toggle iLike property if user click like', () => {
    likeComponent.iLike = false;

    likeComponent.click();

    expect(likeComponent.iLike).toBe(true);
  });

  it('should increese totalLikes if user click like', () => {
    likeComponent.totalLikes = 0;
    likeComponent.iLike = false;

    likeComponent.click();

    expect(likeComponent.totalLikes).toBe(1);
  });

  it('should decreese totalLikes if user click like another time', () => {
    likeComponent.totalLikes = 8;
    likeComponent.iLike = true;

    likeComponent.click();

    expect(likeComponent.totalLikes).toBe(7);
  });

})