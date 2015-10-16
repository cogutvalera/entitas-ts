﻿module example {

  import IExecuteSystem = entitas.IExecuteSystem;
  import ISetPool = entitas.ISetPool;
  import CoreMatcher = entitas.CoreMatcher;
  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Matcher = entitas.Matcher;

  export class MoveSystem implements IExecuteSystem, ISetPool {
    _group:Group;

    public setPool(pool:Pool) {
      this._group = pool.getGroup(Matcher.allOf(CoreMatcher.Move, CoreMatcher.Position));
    }

    public execute() {
      var entities = this._group.getEntities();
      console.log('entities', entities.length);
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        var move = e.move;
        var pos = e.position;
        e.replacePosition(pos.x, pos.y + move.speed*.5, pos.z);
      }
    }
  }

}