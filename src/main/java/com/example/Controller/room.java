package com.example.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.ibatis.javassist.expr.NewArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.pojo.JSONResult;
import com.example.pojo.SQLCheck;
import com.example.pojo.StringToArray;


@RequestMapping("/room")
@RestController
public class room {
	Map<String, Boolean> state = new HashMap<>();
	HashMap<String, List<String>> room = new HashMap<String, List<String>>();
	HashMap<String, Map<String, List<String>>> roommenbers = new HashMap<String,Map<String, List<String>>>();
	@Autowired
	private JdbcTemplate jdbcTemplate;

	//// 添加新的房间的信息
	@RequestMapping("/add_room")
	public JSONResult AddRoom(String room_id, String host_id, String room_name, String max_id, String lasttime) {
		List<String> list1 = new ArrayList<String>();
		list1.add(host_id);
		list1.add(max_id);
		list1.add(lasttime);
		list1.add("0");
		list1.add(room_id);
		list1.add(room_name);
		room.put("room_" + room_id + "_" + room_name, list1);
		state.put("room_" + room_id + "_" + room_name, true);
		Map<String, List<String>> map=new HashMap<String, List<String>>();
		roommenbers.put("room_" + room_id + "_" + room_name, map);
		return JSONResult.ok(roommenbers);
		/*
		 * String sql = "select count(*) from room where room_id="+room_id; // 判断是否存在记录数
		 * int count = jdbcTemplate.queryForObject(sql, Integer.class);
		 * 
		 * if(count!=0) { return JSONResult.errorException("商家已存在"); } else {
		 * if(!SQLCheck.isValid(room_name)) { return
		 * JSONResult.errorException("商店名字含有特殊字符和特殊字如delete/select/update"); }
		 * 
		 * // double longitude = Double.parseDouble(store_longitude); //double latitude
		 * = Double.parseDouble(store_latitude); sql =
		 * "insert into room value(?,?,?,?,?)";
		 * jdbcTemplate.update(sql,room_id,host_id,room_name,max_id,lasttime);
		 * StringBuffer sb = new StringBuffer(""); sb.append("CREATE TABLE `"
		 * +room_id+"_"+room_name+ "` (");
		 * sb.append(" `openid` varchar(255) NOT NULL,");
		 * sb.append(" `avatarurl` varchar(255) NOT NULL,");
		 * sb.append(" `nickname` varchar(255) NOT NULL,");
		 * sb.append(" `sum` varchar(255) NOT NULL");
		 * sb.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8;"); int
		 * check=jdbcTemplate.update(sb.toString()); if(check<0) { return
		 * JSONResult.errorMsg("添加房间失败"); } return JSONResult.ok("添加房间成功"); }
		 */
	}

	/// 查询所有房间
	@RequestMapping("/query_room")
	public JSONResult query_room() {
		List<List<String>> list = new ArrayList<List<String>>();
		Iterator<Entry<String, List<String>>> iterator = room.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			List<String> value = room.get(key);
			list.add(value);
		}
		return JSONResult.ok(list);
		/*
		 * String sql="select * from room"; List<Map<String, Object>> list=new
		 * ArrayList<Map<String,Object>>(); list = jdbcTemplate.queryForList(sql);
		 * if(list!=null) { return JSONResult.ok(list);} else { return
		 * JSONResult.ok("请先创建房间"); }
		 */
	}

	/// 查询房间里的所有人
	@RequestMapping("/query_room_menbers")
	public JSONResult query_room_menbers(String room_id, String room_name) {
		/*Iterator<Entry<String, List<Map<String, List<String>>>>> iterator = roommenbers.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			if (("room_" + room_id + "_" + room_name).equals(key)) {
				List<Map<String, List<String>>> value = roommenbers.get(key);

				return JSONResult.ok(value);
			}

		}
		return JSONResult.errorMsg("找不到该房间");*/
		
		HashMap<String, Map<String, List<String>>> roommenbers1 = new HashMap<String,Map<String, List<String>>>();
		roommenbers1=roommenbers;
		
		List<List<String>> list2=new ArrayList<List<String>>();
		Date date = new Date(); 
		System.out.println("1:"+date.getTime()+":"+"room_" + room_id + "_" + room_name);
		
		for(String key:roommenbers1.keySet()) {
			
			System.out.println("5:"+date.getTime()+("room_" + room_id + "_" + room_name).equals(key));
			System.out.println(key);
			if (("room_" + room_id + "_" + room_name).equals(key)) {
				System.out.println("3:"+date.getTime()+":"+"room_" + room_id + "_" + room_name);
				
				for(String key1:roommenbers1.get(key).keySet()) {
						
						System.out.println("4:"+date.getTime()+":"+key1);
						List<String> list3=new ArrayList<String>();
						list3.add(roommenbers1.get(key).get(key1).get(0));
						list3.add(roommenbers1.get(key).get(key1).get(1));
						list2.add(list3);
						System.out.println(list3);
						}
				return JSONResult.ok(list2);   
					}
				
				}
			
		return JSONResult.errorMsg("该房间没有人");

		/*
		 * String sql="select * from "+room_id+"_"+room_name;; List<Map<String, Object>>
		 * list=new ArrayList<Map<String,Object>>(); list =
		 * jdbcTemplate.queryForList(sql); if(list!=null) { return JSONResult.ok(list);}
		 * else { return JSONResult.ok("请先创建房间"); }
		 */
	}

	/// 删除房间
	@RequestMapping("/delete_room")
	public JSONResult delete_room(String room_id, String room_name) {

		room.remove("room_" + room_id + "_" + room_name);
		roommenbers.remove("room_" + room_id + "_" + room_name);
		/*
		 * String sql="delete  from room where room_id="+room_id;
		 * jdbcTemplate.update(sql); sql="drop table "+room_id+"_"+room_name;
		 * jdbcTemplate.update(sql);
		 */
		return JSONResult.ok("删除成功");
	}

	//// 该用户创建的房间
	@RequestMapping("/search_rooms")
	public JSONResult search_rooms(String host_id) {
		List<List<String>> list = new ArrayList<List<String>>();
		Iterator<Entry<String, List<String>>> iterator = room.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			if ((host_id).equals(room.get(key).get(0))) {
				list.add(room.get(key));

			}
		}
		return JSONResult.ok(list);

		/*
		 * String sql="select * from room where host_id='"+host_id+"'"; List<Map<String,
		 * Object>> list=new ArrayList<Map<String,Object>>(); list =
		 * jdbcTemplate.queryForList(sql); if(list!=null) { return JSONResult.ok(list);}
		 * else { return JSONResult.ok("请先创建房间"); }
		 */
	}

	// 用户进入房间
	@RequestMapping("/join_room")
	public JSONResult join_room(String room_id, String room_name, String openid, String avatarurl, String nickname,
			String sum) {
		HashMap<String, Map<String, List<String>>> roommenbers1 = new HashMap<String,Map<String, List<String>>>();
		roommenbers1=roommenbers;
		List<String> list = new ArrayList<String>();
		list.add(avatarurl);
		list.add(nickname);
		list.add(sum);
		list.add(room_id);
		list.add(room_name);
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		 map = roommenbers1.get("room_" + room_id + "_" + room_name);
		map.put(openid, list);
		roommenbers1.put("room_" + room_id + "_" + room_name, map);
		
		/*
		 * String
		 * sql="select count(*) from "+room_id+"_"+room_name+" where openid='"+openid+
		 * "'"; if (jdbcTemplate.queryForObject(sql,Integer.class) != 0) { return
		 * JSONResult.ok("该用户已存在"); } sql =
		 * "insert into "+room_id+"_"+room_name+" value(?,?,?,?)";
		 * 
		 * int check=jdbcTemplate.update(sql,openid,avatarurl,nickname,sum); if(check<0)
		 * { return JSONResult.errorMsg("添加用户信息失败"); }
		 */
		roommenbers=roommenbers1;
		return JSONResult.ok(roommenbers);
	}

	// 更新摇动数据
	@RequestMapping("/update_user")
	public JSONResult update_item(String room_id, String room_name, String openid, String sum) {
		Iterator<Entry<String, Map<String, List<String>>>> iterator = roommenbers.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			if (("room_" + room_id + "_" + room_name).equals(key)) {
				Map<String, List<String>> map = roommenbers.get(key);
				Iterator<Entry<String, List<String>>> iterator1 = map.entrySet().iterator();
				while (iterator1.hasNext()) {
						String key1 = iterator1.next().getKey();
						//找到那个人
						if (key1.equals(openid)) {
							//找到房间
							Map<String, List<String>> map2=roommenbers.get(key);
							//找到人
							List<String>list=map2.get(key1);
							//更新
							list.set(2, sum);
							map2.put(key1, list);
							roommenbers.put(key, map2);
							return JSONResult.ok(roommenbers);
							
						}
							
						}
					
				
			}

		}
		return JSONResult.errorMsg("修改失败");

		/*
		 * String
		 * sql="update "+room_id+"_"+room_name+" set sum= '"+sum+"' where openid='"
		 * +openid+"'" ; jdbcTemplate.update(sql); return JSONResult.ok("更新成功");
		 */
	}

	/// 返回摇动数目最多的人信息
	@RequestMapping("/query_max_sum")
	public JSONResult query_max_sum(String room_id, String room_name) {
		Iterator<Entry<String,Map<String, List<String>>>> iterator = roommenbers.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			if (("room_" + room_id + "_" + room_name).equals(key)) {
			   ///找到房间里面的人
				Map<String, List<String>> map = roommenbers.get(key);
				int max = 0;
				String name="000";
				Iterator<Entry<String, List<String>>> iterator1 = map.entrySet().iterator();
				while (iterator1.hasNext()) {
						String key1 = iterator1.next().getKey();
						System.out.println(map.get(key1).get(2));
						System.out.println(max);
						if (Integer.parseInt(map.get(key1).get(2)) >= max) {
							name=key1;
							max=Integer.parseInt(map.get(key1).get(2));
						}
						System.out.println(name);
					}
				List<String> list2=new ArrayList<String>();
				list2.add(map.get(name).get(0));
				list2.add(map.get(name).get(1));
				list2.add(map.get(name).get(2));
				return JSONResult.ok(list2);
			}
		}
		/*
		 * String
		 * sql="select * from "+room_id+"_"+room_name+" order by sum desc limit 0,1";
		 * List<Map<String, Object>> list=new ArrayList<Map<String,Object>>(); list =
		 * jdbcTemplate.queryForList(sql); if(list!=null) { return JSONResult.ok(list);}
		 * else { return JSONResult.ok("查询失败"); }
		 */
		return JSONResult.ok("查询失败");
		

	}

	/// 返回房间状态
	@RequestMapping("/returnstate")
	public JSONResult returnstate(String room_id, String room_name) {
		return JSONResult.ok(state.get("room_" + room_id + "_" + room_name));

	}

	// 改变房间状态
	@RequestMapping("/changestate")
	public JSONResult changestate(String room_id, String room_name, boolean State) {
		state.put("room_" + room_id + "_" + room_name, State);
		return JSONResult.ok(state.get("room_" + room_id + "_" + room_name));

	}

	// 用户离开房间
	@RequestMapping("/user_leave")
	public JSONResult update_item(String room_id, String room_name, String openid) {
		Iterator<Entry<String, Map<String, List<String>>>> iterator = roommenbers.entrySet().iterator();
		while (iterator.hasNext()) {
			String key = iterator.next().getKey();
			if (("room_" + room_id + "_" + room_name).equals(key)) {
				//房间里面的人
				Map<String, List<String>> map =new HashMap<String, List<String>>(); 
						map=roommenbers.get(key);
				Iterator<Entry<String, List<String>>> iterator1 = roommenbers.get(key).entrySet().iterator();
				while (iterator1.hasNext()) {
						String key1 = iterator1.next().getKey();
						if (key1.equals(openid)) {
							map.remove(key1);
							roommenbers.put(key,map);
							return JSONResult.ok("修改成功");
						}
					}
				}
			}

		return JSONResult.errorMsg("修改失败");

	}

}

