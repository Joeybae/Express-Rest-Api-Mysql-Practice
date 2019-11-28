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
  
        # CREATE DATABASE node_api_codelab_test;
  
  - database 선택
  
        # USE node_api_codelab_test;
  
5. ORM(Object Relational Mapping) 모듈 설치

        # npm install sequelize --save

6. Model 만들기

  - app/api/models/models.js 만들기
  
        const Sequelize = require('sequelize');
        const config = require('../config/environments');
        const sequelize = new Sequelize(
          config.mysql.database,
          config.mysql.username,
          config.mysql.password, {
            host: 'localhost',
            dialect: 'mysql'
          }
        );

        const User = sequelize.define('user', {
            name: Sequelize.STRING
        });

        module.exports = {
          sequelize: sequelize,
          User: User
        }
        
7. CRUD 기능 만들기

  - app/api/user/user.controller.js
  
        const models = require('../../models/models');

        //create (post)
        exports.create = (req, res) => {
          const name = req.body.name || '';
          if (!name.length) {
            return res.status(400).json({error: 'Incorrenct name'});
          }

          models.User.create({
            name: name
          }).then((user) => res.status(201).json(user))
        };

        //read(get, 전체)
        exports.index = (req, res) => {
          models.User.findAll()
              .then(users => res.json(users));
        };

        //read(get, 특정)
        exports.show = (req, res) => {
          const id = parseInt(req.params.id, 10);
          if (!id) {
            return res.status(400).json({error: 'Incorrect id'});
          }

          models.User.findOne({
            where: {
              id: id
            }
          }).then(user => {
            if (!user) {
              return res.status(404).json({error: 'No User'});
            }

            return res.json(user);
          });
        };

        //delete (delete)
        exports.destroy = (req, res) => {
          const id = parseInt(req.params.id, 10);
          if (!id) {
            return res.status(400).json({error: 'Incorrect id'});
          }

          models.User.destroy({
            where: {
              id: id
            }
          }).then(() => res.status(204).send());
        };

        //update (put)
        exports.update = (req, res) => {
            describe('PUT /users/:id', () => {
            it.only('should return 200 status code', (done) => {
                request(app)
                    .put('/users/1')
                    .send({
                    name: 'foo'
                    })
                    .end((err, res) => {
                    if (err) throw err;
                    done();
                    });
                });
            });
            res.send();
        }







