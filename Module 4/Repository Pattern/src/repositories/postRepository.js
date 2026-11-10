const { posts: initialPosts } = require('../data/postStore');

const posts = new Map(
  initialPosts.map((post) => [post.id, { ...post }])
);

let nextId = Math.max(...posts.keys()) + 1;

const postRepository = {
  findAll() {
    return Array.from(posts.values(), (post) => ({ ...post }));
  },

  findById(id) {
    const post = posts.get(id);
    return post ? { ...post } : null;
  },

  create(fields) {
    const post = {
     ...fields,
     id: nextId++,
    };

    posts.set(post.id, post);

    return { ...post };
  },

  update(id, patch) {
    const post = posts.get(id);

    if (!post) {
      return null;
    }

    const updatedPost = {
      ...post,
      ...patch,
      id: post.id,
    };

    posts.set(id, updatedPost);

    return { ...updatedPost };
  },

  remove(id) {
    return posts.delete(id);
  },
};

/*
 * Future Prisma implementation:
 * Replace the internal Map storage and operations with Prisma queries.
 * Keep the same five repository methods and their return contracts.
 * Services will continue working without modification.
 */

module.exports = postRepository;