import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(100, 'Title cannot exceed 100 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters long').max(5000, 'Description cannot exceed 5000 characters'),
    image: z.url('Please enter a valid image URL').optional().or(z.literal('')),
});
