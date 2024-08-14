export class MockResponseAuthSuccess {
  static mockLogin() {
    return {
      message: 'Success, login successfully',
      code: 200,
      data: {
        token: '[ACCESS_TOKEN]',
      },
    };
  }

  static mockRegister() {
    return {
      message:
        'Success, register account with email user_17@mail.id successfully',
      code: 201,
      data: this.mockDataUser('user_17@mail.id'),
    };
  }

  static mockGetDataUsers() {
    return {
      message: 'Success, get data all users successfully',
      code: 200,
      data: {
        users: [
          this.mockDataUser('user_17@mail.id'),
          this.mockDataUser('user_19@mail.id'),
        ],
      },
    };
  }

  static mockDataUser(email: string) {
    return {
      userCode: 'usr-b343340d',
      email: `${email}@mail.id`,
      password: '[HASH_PASSWORD]',
      role: 'common',
      avatar:
        'https://ui-avatars.com/api?name=znovandap@mail.id&bold=true&rounded=true&format=svg&background=random',
      createdAt: '2024-08-12T02:26:10.298Z',
      updatedAt: '2024-08-12T02:26:10.298Z',
    };
  }
}
