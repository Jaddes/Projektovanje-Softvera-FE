INSERT INTO tours."Quizzes"("Id", "AuthorId", "Title", "Description", "CreatedAt", "UpdatedAt")
VALUES (-1, 1, 'Belgrade Basics', 'Test quiz for integration tests.', '2024-01-01', null);

INSERT INTO tours."QuizQuestions"("Id", "QuizId", "Text", "AllowsMultipleAnswers")
VALUES (-11, -1, 'What river flows through Belgrade?', false);

INSERT INTO tours."QuizQuestions"("Id", "QuizId", "Text", "AllowsMultipleAnswers")
VALUES (-12, -1, 'Select all historic fortresses in Belgrade.', true);

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-111, -11, 'Sava', false, 'Sava meets the Danube in Belgrade but is not the main river through the city center.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-112, -11, 'Danube', true, 'The Danube flows through Belgrade.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-113, -11, 'Drina', false, 'The Drina river is far from Belgrade.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-121, -12, 'Kalemegdan Fortress', true, 'Kalemegdan is the central historic fortress.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-122, -12, 'Niš Fortress', false, 'Niš Fortress is located in Niš.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-123, -12, 'Zemun Fortress', true, 'Gardoš tower is part of the historic Zemun fortifications.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-124, -12, 'Petrovaradin Fortress', false, 'Petrovaradin is located in Novi Sad.');

INSERT INTO tours."Quizzes"("Id", "AuthorId", "Title", "Description", "CreatedAt", "UpdatedAt")
VALUES (-2, 2, 'Mountain Safety', 'Safety basics for mountaineering.', '2024-01-02', null);

INSERT INTO tours."QuizQuestions"("Id", "QuizId", "Text", "AllowsMultipleAnswers")
VALUES (-21, -2, 'What should you pack for a winter hike?', true);

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-211, -21, 'Thermal clothing', true, 'Layered clothing helps regulate temperature.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-212, -21, 'Flip flops', false, 'Unsuitable for hiking conditions.');

INSERT INTO tours."QuizAnswerOptions"("Id", "QuestionId", "Text", "IsCorrect", "Feedback")
VALUES (-213, -21, 'Waterproof boots', true, 'Essential for snow and wet terrain.');