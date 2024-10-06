const request = require('supertest');
const mongoose = require('mongoose');
const { connectDB } = require('../db'); // Adjust the path as needed
const { app } = require('../server'); // Import the app here

beforeAll(async () => {
  await connectDB(); // Connect to the test database
});

afterAll(async () => {
  await mongoose.connection.close(); // Close the connection after tests
});

describe('Posts API', () => {
  let postId;

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'This is a test post.',
        author: 'testuser',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    postId = res.body._id; // Store postId for future tests
  });

  it('should retrieve all posts', async () => {
    const res = await request(app).get('/posts');
    console.log(res.body); // Log the response body to check its structure
    expect(res.statusCode).toEqual(200);
    expect(res.body.posts).toBeInstanceOf(Array); // Check for the posts array
    expect(res.body.posts.length).toBeGreaterThan(0); // Optionally check that the array is not empty
  });
  

  it('should retrieve a single post by ID', async () => {
    const res = await request(app).get(`/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', postId);
  });

  it('should update an existing post', async () => {
    const res = await request(app)
      .put(`/posts/${postId}`)
      .send({
        title: 'Updated Test Post',
        content: 'This post has been updated.',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Post');
  });

  it('should delete a post', async () => {
    const res = await request(app).delete(`/posts/${postId}`);
    expect(res.statusCode).toEqual(204); // No content status
  });
});
