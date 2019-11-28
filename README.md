# Express-Rest-Api-Mysql-Practice

이전 코드를 기반으로 합니다. 이전 코드는 여기에서 https://github.com/Joeybae/Express-Rest-Api-Practice 확인 가능합니다.

참고 : http://webframeworks.kr/tutorials/nodejs/api-server-by-nodejs-05/ , https://bluearoma.tistory.com/18

---------------------------------

# mysql 설치 및 실행방법

1. mysql 설치

  - Mac 버전
  
        # brew install mysql

  - 일반 설치
  
        https://dev.mysql.com/downloads/mysql/ 맞는 버전 다운로드 후 설치

2. mysql 환경변수 

  - 경로 변경
  
        # cd /usr/local/mysql/etc
        # sudo vi profile

  - profile 파일에 경로 추가
  
        # profile 맨 하단으로 이동하여 i를 누른후 아래의 2가지 경로를 복사하여 붙여넣는다.
        # export DB_HOME=/usr/local/mysql
        # export PATH="$PATH:/usr/local/mysql/bin"
        # 그 후 esc를 누른 후 :wq를 누른다. 만약, 에러 발생 시 :w!를 입력하고, :q를 눌러서 profile에서 나온다.
        
  - 설정 적용 (위와 같은 경로)
  
        # source /etc/profile 

3. mysql 실행

  - mysql 실행
  
        # mysql.server start
  
  - mysql 종료
  
        # mysql.server stop
  
  - mysql 접속
  
        # mysql -u root -h localhost -p
        # 비밀번호를 설정 안하셧다면 root를 입력하면 되고, 설정 시 비밀번호를 입력하고 접속하면 된다.
        # 접속에 성공하면 'mysql>' 이라고 표시되는것을 볼 수 있다.

4. mysql 데이터베이스 확인 및 만들기

  - databases 확인
  
        # SHOW DATABASES;
  
  - 결과
  
        +--------------------+
        | Database           |
        +--------------------+
        | information_schema |
        | mysql              |
        | performance_schema |
        | sys                |
        +--------------------+

  - database 만들기 (database 명 : node_api_codelab)
  
        # CREATE DATABASE node_api_codelab;
  
  - database 선택
  
        # USE node_api_codelab;
  
5. ORM(Object Relational Mapping) 모듈 설치

        # npm install sequelize --save

6. User model 만들기

  - model.js 만들기
  
        const Sequelize = require('sequelize');
        //Sequelize(database, id, pw) 순으로 입력
        const sequelize = new Sequelize('node_api_codelab', 'root', 'root',{
          host: 'localhost',
          dialect: 'mysql'// pick one of 'mysql','sqlite','postgres','mssql',
        });

        const User = sequelize.define('user', {
            name: Sequelize.STRING
        });

        module.exports = {
          sequelize: sequelize,
          User: User
        }
        
  - app.js 코드 변경
  
        const express = require('express');
        const bodyParser = require('body-parser');
        const app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use('/users', require('./users'));

        app.listen(3000, () => {
          console.log('Example app listening on port 3000!');

          // 실제 운영중에는 force:false로 변경
          // force가 ture면 실행될 때 마다 테이블을 새로 생성하지만, false로 설정하면 중복 생성을 하지 않는다.
          require('./models').sequelize.sync({force: false})
            .then(() => {
              console.log('Databases sync');
            });
        });

        module.exports = app;

  - 실행
  
        # npm start
  
  - 결과
  
        Example app listening on port 3000!
        Executing (default): CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
        Executing (default): SHOW INDEX FROM `users`

  - Error: Please install mysql2 package manually 발생 시
  
        # npm install mysql2 --save
        
  - TABLE 확인
  
        # mysql -u root -h localhost -p
        
        # mysql> SHOW TABLES;
        
  - 결과
  
        +----------------------------+
        | Tables_in_node_api_codelab |
        +----------------------------+
        | users                      |
        +----------------------------+
        1 row in set (0.00 sec)

  - users 정보 확인
  
        # mysql> describe users;
        
  - 결과      
        
        +-----------+--------------+------+-----+---------+----------------+
        | Field     | Type         | Null | Key | Default | Extra          |
        +-----------+--------------+------+-----+---------+----------------+
        | id        | int(11)      | NO   | PRI | NULL    | auto_increment |
        | name      | varchar(255) | YES  |     | NULL    |                |
        | createdAt | datetime     | NO   |     | NULL    |                |
        | updatedAt | datetime     | NO   |     | NULL    |                |
        +-----------+--------------+------+-----+---------+----------------+
        4 rows in set (0.01 sec)
