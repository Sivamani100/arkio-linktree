import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image, ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Add, CloseCircle, Edit2, Trash, ArrowUp2, ArrowDown2 } from "iconsax-react-nativejs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";
import { getTheme } from "@/utils/themes";

const COLORS = ["#000","#FFF","#F3F3F1","#FF5B5B","#3B82F6","#10B981","#8B5CF6","#F59E0B","#EC4899","#14B8A6"];
const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300",
];
const ACHIEVEMENT_ICONS = ["trophy","medal","gem","fire","bolt","crown"];

export default function VisualEditorScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, links, addLink, removeLink, updateLink, reorderLinks, updateProfile, showToast, products, addProduct, removeProduct, achievements, addAchievement, removeAchievement, awards } = useApp();
  const theme = getTheme(profile.themeId);
  const ct = profile.customTheme;

  const [editingId, setEditingId] = useState<string|null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState(profile.bio);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [addProductMode, setAddProductMode] = useState(false);
  const [pTitle, setPTitle] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pUrl, setPUrl] = useState("");
  const [pImg, setPImg] = useState(STOCK_IMAGES[0]);
  const [addAchMode, setAddAchMode] = useState(false);
  const [achTitle, setAchTitle] = useState("");
  const [achDesc, setAchDesc] = useState("");
  const [achIcon, setAchIcon] = useState("trophy");
  const [achImg, setAchImg] = useState("");

  const [editImg, setEditImg] = useState("");
  const [newImg, setNewImg] = useState("");

  const visibleLinks = links.filter(l => !l.archived);
  const bgColor = ct ? ct.backgroundColor : theme.background;
  const textColor = ct ? ct.fontColor : theme.text;
  const btnColor = ct ? ct.buttonColor : theme.buttonBackground;
  const btnTextColor = ct ? ct.buttonFontColor : theme.buttonText;
  const btnRadius = !ct ? 12 : ct.buttonShape === "pill" ? 999 : ct.buttonShape === "rectangle" ? 0 : 12;
  const btnHeight = ct?.buttonHeight || 52;

  const updateCT = (p: any) => updateProfile({ customTheme: { ...(ct || { backgroundType:"flat",backgroundColor:"#F3F3F1",buttonStyle:"fill",buttonShape:"rounded",buttonColor:"#FFF",buttonFontColor:"#000",fontColor:"#000",buttonHeight:52 }), ...p }});

  const moveLink = (i: number, d: -1|1) => {
    const n = i+d; if(n<0||n>=visibleLinks.length) return;
    const c=[...visibleLinks]; [c[i],c[n]]=[c[n],c[i]];
    reorderLinks([...c,...links.filter(l=>l.archived)]);
  };

  const TopBar = () => (
    <View style={[s.topBar,{paddingTop:Math.max(insets.top,24)}]}>
      <Pressable hitSlop={12} onPress={()=>router.back()}><CloseCircle size={24} color={textColor} variant="Linear"/></Pressable>
      <Text style={[s.topTitle,{color:textColor}]}>Visual Editor</Text>
      <Pressable hitSlop={12} onPress={()=>router.push("/appearance")}><FontAwesome5 name="palette" size={18} color={textColor}/></Pressable>
    </View>
  );

  const Content = () => (
    <ScrollView contentContainerStyle={[s.content,{paddingBottom:insets.bottom+100}]}>
      {/* Color Picker Toggle */}
      <Pressable onPress={()=>setShowColorPicker(!showColorPicker)} style={[s.colorToggle,{borderColor:textColor+"40"}]}>
        <FontAwesome5 name="paint-brush" size={14} color={textColor}/>
        <Text style={{color:textColor,fontFamily:"Inter_600SemiBold",fontSize:13}}>Text Color</Text>
      </Pressable>
      {showColorPicker && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.colorBar}>
          {COLORS.map(c=>(
            <Pressable key={c} onPress={()=>updateCT({fontColor:c})} style={[s.cc,{backgroundColor:c},(c==="#FFF"||c==="#F3F3F1")&&{borderWidth:1,borderColor:"#ccc"},textColor===c&&{borderWidth:3,borderColor:colors.primary}]}/>
          ))}
        </ScrollView>
      )}

      {/* Profile */}
      <Pressable onPress={()=>router.push("/appearance")} style={s.profileWrap}>
        {profile.profilePhotoUri ? <Image source={{uri:profile.profilePhotoUri}} style={s.profilePhoto}/> :
        <View style={[s.profilePhoto,{backgroundColor:"#1D4ED8",alignItems:"center",justifyContent:"center"}]}><FontAwesome5 name="user" size={36} color="#FFF"/></View>}
        <View style={s.editOverlay}><FontAwesome5 name="camera" size={12} color="#FFF"/></View>
      </Pressable>
      <View style={s.nameRow}>
        <Text style={[s.username,{color:textColor}]}>@{profile.username}</Text>
        {profile.isVerified && <FontAwesome5 name="check-circle" size={18} color="#3B82F6"/>}
      </View>

      {/* Bio */}
      {editingBio ? (
        <View style={[s.editCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
          <TextInput value={bioText} onChangeText={setBioText} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} multiline autoFocus/>
          <View style={s.editActions}>
            <Pressable onPress={()=>{updateProfile({bio:bioText});setEditingBio(false);showToast("Bio saved!")}} style={[s.editBtn,{backgroundColor:colors.primary}]}><Text style={{color:"#FFF",fontFamily:"Inter_600SemiBold"}}>Save</Text></Pressable>
            <Pressable onPress={()=>setEditingBio(false)} style={[s.editBtn,{backgroundColor:colors.secondary}]}><Text style={{color:colors.foreground}}>Cancel</Text></Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={()=>{setBioText(profile.bio);setEditingBio(true)}}>
          <Text style={[s.bio,{color:textColor,opacity:profile.bio?0.85:0.4}]}>{profile.bio||"Tap to add bio..."}</Text>
        </Pressable>
      )}

      {/* === LINKS === */}
      <Text style={[s.sectionHead,{color:textColor}]}>🔗 Links</Text>
      <View style={s.linksWrap}>
        {visibleLinks.map((link,i) => editingId===link.id ? (
          <View key={link.id} style={[s.editCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
            <TextInput value={editTitle} onChangeText={setEditTitle} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Title"/>
            <TextInput value={editUrl} onChangeText={setEditUrl} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="https://..."/>
            <TextInput value={editImg} onChangeText={setEditImg} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Image URL (optional)"/>
            <View style={s.editActions}>
              <Pressable onPress={()=>{updateLink(link.id,{title:editTitle,url:editUrl,imageUri:editImg||undefined});setEditingId(null);showToast("Saved!")}} style={[s.editBtn,{backgroundColor:colors.primary}]}><Text style={{color:"#FFF",fontFamily:"Inter_600SemiBold"}}>Save</Text></Pressable>
              <Pressable onPress={()=>setEditingId(null)} style={[s.editBtn,{backgroundColor:colors.secondary}]}><Text style={{color:colors.foreground}}>Cancel</Text></Pressable>
            </View>
          </View>
        ) : (
          <View key={link.id} style={[s.linkCard,{backgroundColor:btnColor,borderRadius:btnRadius,height:btnHeight}]}>
            <Text style={[s.linkText,{color:btnTextColor}]} numberOfLines={1}>{link.title}</Text>
            <View style={s.linkActions}>
              <Pressable hitSlop={6} onPress={()=>moveLink(i,-1)}><ArrowUp2 size={16} color={btnTextColor} variant="Linear"/></Pressable>
              <Pressable hitSlop={6} onPress={()=>moveLink(i,1)}><ArrowDown2 size={16} color={btnTextColor} variant="Linear"/></Pressable>
              <Pressable hitSlop={6} onPress={()=>{setEditingId(link.id);setEditTitle(link.title);setEditUrl(link.url);setEditImg(link.imageUri||"")}}><Edit2 size={16} color={btnTextColor} variant="Linear"/></Pressable>
              <Pressable hitSlop={6} onPress={()=>{removeLink(link.id);showToast("Deleted")}}><Trash size={16} color="#EF4444" variant="Linear"/></Pressable>
            </View>
          </View>
        ))}
      </View>
      {addMode ? (
        <View style={[s.editCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
          <TextInput value={newTitle} onChangeText={setNewTitle} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Link title" autoFocus/>
          <TextInput value={newUrl} onChangeText={setNewUrl} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="https://..."/>
          <TextInput value={newImg} onChangeText={setNewImg} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Image URL (optional)"/>
          <View style={s.editActions}>
            <Pressable onPress={()=>{if(newTitle.trim()){addLink({title:newTitle,url:newUrl,type:"link",enabled:true,imageUri:newImg||undefined});setNewTitle("");setNewUrl("");setNewImg("");setAddMode(false);showToast("Added!")}}} style={[s.editBtn,{backgroundColor:colors.primary}]}><Text style={{color:"#FFF",fontFamily:"Inter_600SemiBold"}}>Add</Text></Pressable>
            <Pressable onPress={()=>setAddMode(false)} style={[s.editBtn,{backgroundColor:colors.secondary}]}><Text style={{color:colors.foreground}}>Cancel</Text></Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={()=>setAddMode(true)} style={[s.addBtn,{borderColor:textColor+"40"}]}>
          <Add size={22} color={textColor} variant="Linear"/><Text style={{color:textColor,fontFamily:"Inter_600SemiBold"}}>Add link</Text>
        </Pressable>
      )}

      {/* === PRODUCTS === */}
      <Text style={[s.sectionHead,{color:textColor}]}>🛍️ Products</Text>
      <View style={{ width: "100%", gap: 12 }}>
        {products.map(p=>(
          <View key={p.id} style={[s.prodCardWideEditor,{backgroundColor:colors.card,borderColor:colors.border}]}>
            <Image source={{uri:p.imageUri}} style={s.prodImgWide}/>
            <View style={{ padding: 12, flexDirection: "row", alignItems: "center" }}>
              <View style={{ flex: 1 }}>
                <Text style={[s.prodTitle,{color:colors.foreground}]} numberOfLines={1}>{p.title}</Text>
                <Text style={{color:colors.primary,fontFamily:"Inter_700Bold",fontSize:14}}>{p.price}</Text>
              </View>
              <Pressable onPress={()=>{removeProduct(p.id);showToast("Removed")}}><Trash size={18} color="#EF4444" variant="Linear"/></Pressable>
            </View>
          </View>
        ))}
      </View>
      {addProductMode ? (
        <View style={[s.editCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
          <TextInput value={pTitle} onChangeText={setPTitle} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Product name" autoFocus/>
          <TextInput value={pPrice} onChangeText={setPPrice} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="$29.99"/>
          <TextInput value={pUrl} onChangeText={setPUrl} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="https://..."/>
          <Text style={{color:colors.mutedForeground,fontFamily:"Inter_500Medium",fontSize:12,marginTop:4}}>Pick a stock image:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,marginTop:6}}>
            {STOCK_IMAGES.map(u=>(
              <Pressable key={u} onPress={()=>setPImg(u)} style={[s.stockThumb,pImg===u&&{borderColor:colors.primary,borderWidth:2}]}>
                <Image source={{uri:u}} style={StyleSheet.absoluteFill} resizeMode="cover"/>
              </Pressable>
            ))}
          </ScrollView>
          <View style={s.editActions}>
            <Pressable onPress={()=>{if(pTitle.trim()){addProduct({title:pTitle,price:pPrice||"Free",imageUri:pImg,url:pUrl});setPTitle("");setPPrice("");setPUrl("");setAddProductMode(false);showToast("Product added!")}}} style={[s.editBtn,{backgroundColor:colors.primary}]}><Text style={{color:"#FFF",fontFamily:"Inter_600SemiBold"}}>Add</Text></Pressable>
            <Pressable onPress={()=>setAddProductMode(false)} style={[s.editBtn,{backgroundColor:colors.secondary}]}><Text style={{color:colors.foreground}}>Cancel</Text></Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={()=>setAddProductMode(true)} style={[s.addBtn,{borderColor:textColor+"40"}]}>
          <Add size={22} color={textColor} variant="Linear"/><Text style={{color:textColor,fontFamily:"Inter_600SemiBold"}}>Add product</Text>
        </Pressable>
      )}

      {/* === ACHIEVEMENTS === */}
      <Text style={[s.sectionHead,{color:textColor}]}>🏆 Achievements</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, width: "100%" }}>
        {achievements.map(a=>(
          <View key={a.id} style={[s.achCardGridEditor,{backgroundColor:colors.card,borderColor:colors.border, width: "48%"}]}>
            {a.imageUri ? (
              <Image source={{uri:a.imageUri}} style={s.achImgGrid}/>
            ) : (
              <View style={[s.achIconPlaceholder,{backgroundColor:colors.primary+"10"}]}><FontAwesome5 name={a.icon} size={20} color={colors.primary}/></View>
            )}
            <View style={{ padding: 10 }}>
              <Text style={{color:colors.foreground,fontFamily:"Inter_600SemiBold",fontSize:14}} numberOfLines={1}>{a.title}</Text>
              <Pressable onPress={()=>{removeAchievement(a.id);showToast("Removed")}} style={{ marginTop: 4 }}><Trash size={14} color="#EF4444" variant="Linear"/></Pressable>
            </View>
          </View>
        ))}
      </View>
      {addAchMode ? (
        <View style={[s.editCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
          <TextInput value={achTitle} onChangeText={setAchTitle} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Achievement title" autoFocus/>
          <TextInput value={achDesc} onChangeText={setAchDesc} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="Description"/>
          <Text style={{color:colors.mutedForeground,fontFamily:"Inter_500Medium",fontSize:12,marginTop:4}}>Achievement Image (URL):</Text>
          <TextInput value={achImg} onChangeText={setAchImg} style={[s.editInput,{color:colors.foreground,borderColor:colors.border}]} placeholder="https://..."/>
          <Text style={{color:colors.mutedForeground,fontFamily:"Inter_500Medium",fontSize:12,marginTop:8}}>Or pick icon:</Text>
          <View style={{flexDirection:"row",gap:12,marginTop:6}}>
            {ACHIEVEMENT_ICONS.map(ic=>(<Pressable key={ic} onPress={()=>{setAchIcon(ic);setAchImg("")}} style={[s.iconPick,achIcon===ic&&{backgroundColor:colors.primary+"20",borderColor:colors.primary}]}><FontAwesome5 name={ic} size={18} color={achIcon===ic?colors.primary:colors.mutedForeground}/></Pressable>))}
          </View>
          <View style={s.editActions}>
            <Pressable onPress={()=>{if(achTitle.trim()){addAchievement({title:achTitle,description:achDesc,icon:achIcon,imageUri:achImg||undefined});setAchTitle("");setAchDesc("");setAchImg("");setAddAchMode(false);showToast("Achievement added!")}}} style={[s.editBtn,{backgroundColor:colors.primary}]}><Text style={{color:"#FFF",fontFamily:"Inter_600SemiBold"}}>Add</Text></Pressable>
            <Pressable onPress={()=>setAddAchMode(false)} style={[s.editBtn,{backgroundColor:colors.secondary}]}><Text style={{color:colors.foreground}}>Cancel</Text></Pressable>
          </View>
        </View>
      ) : (
        <Pressable onPress={()=>setAddAchMode(true)} style={[s.addBtn,{borderColor:textColor+"40"}]}>
          <Add size={22} color={textColor} variant="Linear"/><Text style={{color:textColor,fontFamily:"Inter_600SemiBold"}}>Add achievement</Text>
        </Pressable>
      )}

      {/* === AWARDS === */}
      <Text style={[s.sectionHead,{color:textColor}]}>🎖️ Platform Awards</Text>
      {awards.map(a=>(
        <View key={a.id} style={[s.awardCard,{backgroundColor:colors.card,borderColor:colors.border}]}>
          <View style={[s.awardIcon,{backgroundColor:a.color+"20"}]}><FontAwesome5 name={a.icon} size={20} color={a.color}/></View>
          <View style={{flex:1,marginLeft:12}}>
            <Text style={{color:colors.foreground,fontFamily:"Inter_700Bold",fontSize:15}}>{a.title}</Text>
            <Text style={{color:colors.mutedForeground,fontFamily:"Inter_400Regular",fontSize:12}}>Issued by {a.issuedBy}</Text>
          </View>
          <FontAwesome5 name="check" size={14} color="#10B981"/>
        </View>
      ))}
    </ScrollView>
  );

  if (ct?.backgroundType==="liquid-glass") return (
    <View style={s.flex}><LinearGradient colors={["#0f0c29","#302b63","#24243e"]} style={StyleSheet.absoluteFill}/>
      <View style={[s.orb,{width:280,height:280,top:-60,left:-80,backgroundColor:ct.backgroundColor||"#667eea"}]}/>
      <View style={[s.orb,{width:220,height:220,top:300,right:-60,backgroundColor:"#f093fb"}]}/>
      <View style={[s.orb,{width:200,height:200,bottom:100,left:20,backgroundColor:"#4facfe"}]}/>
      <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill}/><TopBar/><Content/></View>
  );
  if (ct?.backgroundType==="gradient"&&ct.gradientColors) return (<LinearGradient colors={ct.gradientColors} style={s.flex} start={{x:0,y:0}} end={{x:1,y:1}}><TopBar/><Content/></LinearGradient>);
  if (ct?.backgroundType==="image"&&ct.backgroundImageUri) return (<ImageBackground source={{uri:ct.backgroundImageUri}} style={s.flex} resizeMode="cover"><BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill}/><TopBar/><Content/></ImageBackground>);
  return (<View style={[s.flex,{backgroundColor:bgColor}]}><TopBar/><Content/></View>);
}

const s = StyleSheet.create({
  flex:{flex:1},
  topBar:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:16,paddingBottom:10},
  topTitle:{fontFamily:"Inter_700Bold",fontSize:17},
  content:{alignItems:"center",paddingHorizontal:20,paddingTop:12},
  colorToggle:{flexDirection:"row",alignItems:"center",gap:6,paddingHorizontal:14,paddingVertical:8,borderWidth:1,borderRadius:20,alignSelf:"flex-end",marginBottom:8},
  colorBar:{maxHeight:50,marginBottom:12},
  cc:{width:36,height:36,borderRadius:18,marginRight:8},
  profileWrap:{position:"relative",marginBottom:8},
  profilePhoto:{width:96,height:96,borderRadius:48},
  editOverlay:{position:"absolute",bottom:0,right:0,width:28,height:28,borderRadius:14,backgroundColor:"rgba(0,0,0,0.6)",alignItems:"center",justifyContent:"center"},
  nameRow:{flexDirection:"row",alignItems:"center",gap:8,marginTop:10},
  username:{fontFamily:"Inter_700Bold",fontSize:20},
  bio:{fontFamily:"Inter_400Regular",fontSize:14,marginTop:6,textAlign:"center"},
  sectionHead:{fontFamily:"Inter_700Bold",fontSize:17,alignSelf:"flex-start",marginTop:32,marginBottom:12},
  linksWrap:{width:"100%",gap:12},
  linkCard:{flexDirection:"row",alignItems:"center",paddingHorizontal:16,justifyContent:"space-between"},
  linkText:{fontFamily:"Inter_600SemiBold",fontSize:15,flex:1},
  linkActions:{flexDirection:"row",gap:14,alignItems:"center"},
  editCard:{width:"100%",padding:16,borderRadius:14,borderWidth:1,gap:8,marginTop:8},
  editInput:{borderWidth:1,borderRadius:10,paddingHorizontal:12,paddingVertical:10,fontFamily:"Inter_400Regular",fontSize:15},
  editActions:{flexDirection:"row",gap:10,marginTop:8},
  editBtn:{flex:1,paddingVertical:12,alignItems:"center",borderRadius:10},
  addBtn:{width:"100%",marginTop:12,height:48,borderWidth:2,borderStyle:"dashed",borderRadius:14,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8},
  prodCardWideEditor:{borderRadius:14,borderWidth:1,overflow:"hidden"},
  prodImgWide:{width:"100%",height:150},
  achCardGridEditor:{borderRadius:14,borderWidth:1,overflow:"hidden"},
  achImgGrid:{width:"100%",height:100},
  achIconPlaceholder:{width:"100%",height:100,alignItems:"center",justifyContent:"center"},
  orb:{position:"absolute",borderRadius:999,opacity:0.6},
});
